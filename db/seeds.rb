# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Notebook.destroy_all
Note.destroy_all

sample_text_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

sample_text_2 = "Camembert de normandie camembert de normandie everyone loves. Cut the cheese stinking bishop chalk and cheese cheese and biscuits cheese and biscuits cow brie cheese and biscuits. Macaroni cheese blue castello lancashire stilton manchego stinking bishop monterey jack cut the cheese. Cheesecake caerphilly cheesy feet croque monsieur cut the cheese."

sample_text_3 = "This belongs in a dumpster museum. That's not a bad place to be, if you ask me."

sample_text_4 = "When the tides come a knocking, put on your frock and go door to door in an attempt to beat the system."

demo_user = User.create!(email: "demo@demo.com", password: "password", full_name: "Demo User")
demo_notebook_1 = Notebook.create!(name: "My Notebook", author_id: demo_user.id)
demo_note_1 = Note.create!(title: "My Note", body: sample_text_1, notebook_id: demo_notebook_1.id)
demo_note_2 = Note.create!(title: "Two is Company", body: sample_text_2, notebook_id: demo_notebook_1.id)

demo_notebook_2 = Notebook.create!(name: "My Other Notebook", author_id: demo_user.id);
demo_note_3 = Note.create!(title: "This is a note", body: sample_text_3, notebook_id: demo_notebook_2.id)
demo_note_4 = Note.create!(title: "This is also a note", body: sample_text_4, notebook_id: demo_notebook_2.id)
