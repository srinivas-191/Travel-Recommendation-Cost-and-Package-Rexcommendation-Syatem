from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from travel import TravelPackageRecommender

app = Flask(__name__)
CORS(app)

# Initialize the recommender (it will auto-load the CSV)
recommender = TravelPackageRecommender()


@app.route("/")
def index():
    """Render the main page"""
    unique_values = {}
    if recommender.df is not None:
        unique_values = recommender.get_unique_values()

    return render_template("index.html", unique_values=unique_values)


@app.route("/api/recommend", methods=["POST"])
def get_recommendations():
    """Get travel package recommendations"""
    try:
        data = request.json
        print("Received payload:", data)

        # Validate required fields
        required_fields = ["fromCity", "toCity", "type", "budget", "duration"]
        for field in required_fields:
            if field not in data or not data[field]:
                return (
                    jsonify(
                        {"success": False, "error": f"Missing required field: {field}"}
                    ),
                    400,
                )

        # Convert field names
        from_city = data["fromCity"]
        destination = data["toCity"]
        dest_type = data["type"]
        budget = float(data["budget"])
        duration = int(data["duration"])

        # Check if data is loaded
        if recommender.df is None:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "Dataset not loaded. Please check if packagedata_with_id.csv exists.",
                    }
                ),
                500,
            )

        # Get recommendations
        recommendations = recommender.recommend_packages(
            from_city=from_city,
            destination=destination,
            dest_type=dest_type,
            budget=budget,
            duration=duration,
            top_n=5,
        )
        import pandas as pd

        print(pd.DataFrame(recommendations))
        if recommendations is None:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "No matching packages found for your filters",
                    }
                ),
                404,
            )

        return jsonify(
            {
                "success": True,
                "data": {
                    "recommendations": recommendations,
                    "count": len(recommendations),
                    "user_preferences": {
                        "fromCity": from_city,
                        "toCity": destination,
                        "type": dest_type,
                        "budget": budget,
                        "duration": duration,
                    },
                },
            }
        )

    except ValueError as e:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Invalid numeric values provided for budget or duration",
                }
            ),
            400,
        )
    except Exception as e:
        return (
            jsonify({"success": False, "error": f"Recommendation failed: {str(e)}"}),
            500,
        )


@app.route("/api/dataset-info", methods=["GET"])
def get_dataset_info():
    """Get information about the loaded dataset"""
    info = recommender.get_dataset_info()
    return jsonify({"success": True, "data": info})


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    data_loaded = recommender.df is not None
    return jsonify(
        {
            "success": True,
            "data": {
                "status": "healthy",
                "data_loaded": data_loaded,
                "dataset_available": os.path.exists("packagedata_with_id.csv"),
                "service": "Travel Package Recommender API",
            },
        }
    )


if __name__ == "__main__":
    print("🚀 Starting Travel Package Recommender API...")
    print("📁 Current directory:", os.getcwd())
    print("📂 Files in directory:", [f for f in os.listdir(".") if f.endswith(".csv")])

    if recommender.df is not None:
        print("✅ Dataset loaded successfully!")
        print(f"📊 Dataset shape: {recommender.df.shape}")
    else:
        print(
            "❌ Dataset not loaded. Please check if packagedata_with_id.csv exists in the current directory."
        )

    print("\n🌐 Available endpoints:")
    print("   POST /api/recommend - Get package recommendations")
    print("   GET  /api/dataset-info - Get dataset information")
    print("   GET  /api/health - Health check")

    app.run(debug=True, host="0.0.0.0", port=5000)
