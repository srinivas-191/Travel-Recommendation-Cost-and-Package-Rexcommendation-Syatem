import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import os


class TravelPackageRecommender:
    def __init__(self):
        self.df = None
        self.df_scaled = None
        self.scaler = MinMaxScaler()
        self.weights = {
            "Budget": 0.3,
            "Trip_Duration_Days": 0.2,
            "Activities_Count": 0.1,
            "From_City": 0.15,
            "Destination": 0.15,
            "Destination_Type": 0.1,
        }
        self.numeric_features = ["Budget", "Trip_Duration_Days", "Activities_Count"]

        # Auto-load the CSV file on initialization
        self.load_initial_data()

    def load_initial_data(self):
        """Automatically load the packagedata_with_id.csv file"""
        try:
            csv_file_path = "packagedata_with_id.csv"

            if os.path.exists(csv_file_path):
                print(f"📁 Loading dataset from: {csv_file_path}")
                self.df = pd.read_csv(csv_file_path)
                print(f"✅ Dataset loaded successfully! Shape: {self.df.shape}")

                # Preprocess the data
                self._preprocess_data()
                return True
            else:
                print(f"❌ CSV file not found at: {csv_file_path}")
                print("📂 Current working directory:", os.getcwd())
                print("📂 Files in current directory:", os.listdir("."))
                return False

        except Exception as e:
            print(f"❌ Error loading initial data: {str(e)}")
            return False

    def _preprocess_data(self):
        """Preprocess the loaded dataset"""
        if self.df is None:
            return

        # Clean column names
        self.df.columns = self.df.columns.str.strip().str.replace(" ", "_")

        # Add Package_Id if not present
        if "Package_Id" not in self.df.columns:
            self.df.insert(
                0, "Package_Id", [f"Package_Id{i + 1}" for i in range(len(self.df))]
            )

        # Ensure numeric columns are properly formatted
        numeric_columns = ["Budget", "Trip_Duration_Days", "Activities_Count"]
        for col in numeric_columns:
            if col in self.df.columns:
                self.df[col] = pd.to_numeric(self.df[col], errors="coerce")

        # Fill any NaN values in numeric columns with mean
        for col in numeric_columns:
            if col in self.df.columns:
                self.df[col].fillna(self.df[col].mean(), inplace=True)

        # Normalize numeric values
        self.df_scaled = self.df.copy()
        self.df_scaled[self.numeric_features] = self.scaler.fit_transform(
            self.df[self.numeric_features]
        )

        print(f"✅ Data preprocessing completed!")
        print(f"📊 Available cities: {len(self.df['From_City'].unique())}")
        print(f"🎯 Available destinations: {len(self.df['Destination'].unique())}")
        print(
            f"🏷️ Available destination types: {len(self.df['Destination_Type'].unique())}"
        )

    def load_data(self, file_path):
        """Load and preprocess a new dataset (for file upload functionality)"""
        try:
            self.df = pd.read_csv(file_path)
            self._preprocess_data()
            return True
        except Exception as e:
            print(f"Error loading data from {file_path}: {str(e)}")
            return False

    def get_unique_values(self):
        """Get unique values for filters"""
        if self.df is None:
            return {"cities": [], "destinations": [], "destination_types": []}

        return {
            "cities": sorted(self.df["From_City"].unique()),
            "destinations": sorted(self.df["Destination"].unique()),
            "destination_types": sorted(self.df["Destination_Type"].unique()),
        }

    def get_destination_types(self, destination):
        """Get available destination types for a specific destination"""
        if self.df is None or not destination:
            return []

        try:
            return sorted(
                self.df[self.df["Destination"].str.lower() == destination.lower()][
                    "Destination_Type"
                ].unique()
            )
        except:
            return []

    def recommend_packages(
        self, from_city, destination, dest_type, budget, duration, top_n=5
    ):
        """Generate package recommendations based on user preferences"""
        try:
            if self.df_scaled is None:
                return None

            # Filter packages based on categorical preferences
            subset = self.df_scaled[
                (self.df_scaled["From_City"].str.lower() == from_city.lower())
                & (self.df_scaled["Destination"].str.lower() == destination.lower())
                & (self.df_scaled["Destination_Type"].str.lower() == dest_type.lower())
            ].copy()

            if subset.empty:
                print(
                    f"❌ No packages found for: {from_city} -> {destination} ({dest_type})"
                )
                return None

            print(f"✅ Found {len(subset)} packages matching criteria")

            # Create user preference vector
            user_data = pd.DataFrame(
                [
                    {
                        "Budget": budget,
                        "Trip_Duration_Days": duration,
                        "Activities_Count": self.df["Activities_Count"].mean(),
                    }
                ]
            )

            # Scale user data
            user_scaled = self.scaler.transform(user_data[self.numeric_features])
            user_scaled = pd.DataFrame(user_scaled, columns=self.numeric_features)

            # Apply weights
            for col in self.numeric_features:
                subset[col] = subset[col] * self.weights.get(col, 0)
                user_scaled[col] = user_scaled[col] * self.weights.get(col, 0)

            # Calculate cosine similarity
            similarity = cosine_similarity(user_scaled, subset[self.numeric_features])[
                0
            ]

            # Scale similarity between [0.90, 0.97]
            if similarity.max() != similarity.min():
                min_target, max_target = 0.90, 0.97
                similarity = min_target + (max_target - min_target) * (
                    similarity - similarity.min()
                ) / (similarity.max() - similarity.min())
            else:
                similarity = np.full_like(similarity, 0.935)

            subset["Similarity_Score"] = similarity

            # Get top packages
            top_packages = subset.sort_values(
                by="Similarity_Score", ascending=False
            ).head(top_n)

            # Prepare result
            result = self.df.loc[
                top_packages.index,
                [
                    "Package_Id",
                    "From_City",
                    "Destination",
                    "Destination_Type",
                    "Trip_Duration_Days",
                    "Activities_Count",
                    "Accommodation",
                    "Transport_Mode",
                    "Package_Type",
                    "Budget",
                    "Season",
                ],
            ].assign(Similarity_Score=top_packages["Similarity_Score"].round(3))

            print(f"🎉 Generated {len(result)} recommendations")
            return result.to_dict("records")

        except Exception as e:
            print(f"❌ Error in recommendation: {str(e)}")
            return None

    def get_dataset_info(self):
        """Get information about the loaded dataset"""
        if self.df is None:
            return {"error": "No dataset loaded"}

        return {
            "shape": self.df.shape,
            "columns": list(self.df.columns),
            "cities_count": len(self.df["From_City"].unique()),
            "destinations_count": len(self.df["Destination"].unique()),
            "destination_types_count": len(self.df["Destination_Type"].unique()),
            "memory_usage": f"{self.df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB",
        }
