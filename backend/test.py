
from supabase import create_client, Client

url = 'https://fqdwaumpuuqxjezhlqhy.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZHdhdW1wdXVxeGplemhscWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA2NTQsImV4cCI6MjA1MzI0NjY1NH0.pX0sSotwXWuZY0yye8gdk9HJQhPk-L_yjHeFDn8tyks'

supabase: Client = create_client(url, key)

response = supabase.table("recipes").select("*").execute()
print(response)





supabase.table("recipes").insert({"created_by": 1,
            "name": "test_cookie",
            "ingredients": "flour, butter, sugar",
            "instructions": "bake please",
            "cooking_time": 5,
            }).execute()