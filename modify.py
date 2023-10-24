import json

# Define the path to your JSON file
json_file_path = "./bookkaro.hotels.json"  # Update with the path to your JSON file

# Load the existing JSON data from the file
with open(json_file_path, 'r') as file:
    data = json.load(file)

# Define the multiplier data for the 14 hotels (replace with your data)
multiplier_data = [
    [0.85, 0.9, 0.95, 1.0, 1.05, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5],
    [0.9, 0.95, 1.0, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55],
    [0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6],
    [1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65],
    [1.05, 1.1, 1.15, 1.2, 1.25, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7],
    [1.1, 1.15, 1.2, 1.25, 1.3,  1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75],
    [1.15, 1.2, 1.25, 1.3,  1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8],
    [1.2, 1.25, 1.3, 1.35, 1.4,  1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85],
    [1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.8, 1.85, 1.9],
    [1.3, 1.35, 1.4, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95],
    [1.35, 1.4,  1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 1.0],
    [1.4, 1.45, 1.5, 1.55,  1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 1.0, 1.05],
    [1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8,  1.95, 1.0, 1.05, 1.1],
    [1.5, 1.55, 1.6,  1.75, 1.8, 1.85, 1.9, 1.95, 1.0, 1.05, 1.1, 1.15]
  ]

# Append the multiplier data to each hotel object
for i, hotel in enumerate(data):
    hotel["multiplier"] = multiplier_data[i]

# Save the updated data back to the JSON file
with open(json_file_path, 'w') as file:
    json.dump(data, file, indent=2)

print("Multipliers added to the JSON data.")
