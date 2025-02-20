from flask_cors import CORS
import os
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv

# Load .env file
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)


@app.route('/recipe/create', methods=['POST'])
def create_recipe():
    print("creating")
    data = request.get_json()
    print("Received Data:", data)  # Debugging

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:
        response = supabase.table("recipes").insert({
            "created_by": data.get("author"),
            "name": data.get("name"),
            "ingredients": data.get("ingredients"),
            "instructions": data.get("instructions"),
            "cooking_time": data.get("cooking_time"),
        }).execute()

        return jsonify({"message": "Recipe added successfully", "data": response.data})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/recipes', methods=['GET'])
def get_recipes():
    response = supabase.table("recipes").select("*").execute()
    print(response)
    return jsonify(response.data)



@app.route('/recipe/delete/<int:recipe_id>', methods=['DELETE'])
def delete_recipe():
    recipe_id_to_delete = recipe_id

    response = supabase.table("recipes").delete().eq("id", recipe_id_to_delete).execute()

    return jsonify(response.data), response.status_code



@app.route('/recipe/retrieve/<int:recipe_id>', methods=['GET'])
def retrieve_recipe():
    recipe_id_to_retrieve = recipe_id
    response = supabase.table("recipes").select("*").eq('id', recipe_id_to_retrieve).execute()
    return jsonify(response.data)




# USERS





if __name__ == '__main__':
    app.run()




