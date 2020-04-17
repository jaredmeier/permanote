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
Tag.destroy_all
NoteTag.destroy_all

sample_text_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
sample_text_2 = "Camembert de normandie camembert de normandie everyone loves. Cut the cheese stinking bishop chalk and cheese cheese and biscuits cheese and biscuits cow brie cheese and biscuits. Macaroni cheese blue castello lancashire stilton manchego stinking bishop monterey jack cut the cheese. Cheesecake caerphilly cheesy feet croque monsieur cut the cheese."
emoji_text_1 = "<h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">🙁 😖 😞 😟 😢 😭 😦 😧 😨 </span></h1><h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">😩 😩 😩 😩 😩 😩 😩 😩 😩 </span></h1><h1><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">😩 😩 😩 😩 😩 
😩 😩 😩 😩 </span></h1><h1><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">😩 😩 😩 😩 😩 😩 😩 😩 😩 </span></h1><h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">😡 😠 🤬 🤒 🤕 \u{1F97A} 😥 😰 🤧</span></h1><h1><br></h1>"
emoji_text_2 = "<h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 \u{1F970} 😗 😙 😚 </span></h1><h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">🙂 🤗 🤩 🤔 🤨 😐 😶 🙄 😏 😣 😮 🤐 😯 😪 😫 😴 😌 😛 </span></h1><h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 😬 😱 \u{1F975} \u{1F976} 😳 🤪 😵 😷 </span></h1><h1><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">😇 🤠 🤫 🤭 🧐 🤓 😈 👿 😺 😸 😹 😻 😼 😽 🙀 😿 😾"
emoji_text_3 = "<h1><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">👹👺💀👻👽🤖💩🤡😤🤯🤢🤮\u{1F973}\u{1F974}🤥😑</span></h1><p><br></p><h1><br></h1><h1><br></h1><p><br></p><h1><br></h1>"
emoji_text_4 = "<p>💆 💆🏻 💆🏼 💆🏽 💆🏾 💆🏿 💆<U+200D>♂️ 💆🏻<U+200D>♂️ 💆🏼<U+200D>♂️ 💆🏽<U+200D>♂️ 💆🏾<U+200D>♂️ 💆🏿<U+200D>♂️ 💆<U+200D>♀️ 💆🏻<U+200D>♀️ 💆🏼<U+200D>♀️ 💆🏽
<U+200D>♀️ 💆🏾<U+200D>♀️ 💆🏿<U+200D>♀️&nbsp;</p>"
gandalf_text_1 = "<pre class=\"ql-syntax\" spellcheck=\"false\">I wish it need not have happened in my time,” said Frodo. \n\n“So do I,” said Gandalf, “and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.\" \n\n\n\n\n\n\n\n\n\n\n</pre><p>🙂</p>"
gandalf_text_2 = "<pre class=\"ql-syntax\" spellcheck=\"false\">PIPPIN: I didn't think it would end this way.\n\nGANDALF: End? No, the journey doesn't end here. Death is just another path, one that we all must take. The grey rain-curtain of this world rolls back, and all turns to silver glass, and then you see it.\n\nPIPPIN: What? Gandalf? See what?\n\nGANDALF: White shores, and beyond, a far green country under a swift sunrise.\n\nPIPPIN: Well, that isn't so bad.\n\n</pre>"
listicle_text = "<ol><li><span style=\"color: rgb(230, 0, 0);\">List</span></li><li><span class=\"ql-font-serif\" style=\"color: rgb(230, 0, 0);\">Listeria</span></li><li><span class=\"ql-font-monospace\" style=\"color: rgb(230, 0, 0);\">Listless</span></li><li><span class=\"ql-font-monospace\" style=\"color: rgb(230, 0, 0);\">Listless in Sleattle</span></li></ol>"

demo_user = User.create!(email: "demo@demo.com", password: "password", full_name: "Demo User")

demo_notebook_1 = Notebook.create!(name: "My First Notebook", author_id: demo_user.id)
demo_notebook_2 = Notebook.create!(name: "My Other Notebook", author_id: demo_user.id);
book_of_emoji = Notebook.create!(name: "Book of Emoji", author_id: demo_user.id)
gandalf_book = Notebook.create!(name: "Couple Things Gandalf Says", author_id: demo_user.id)

demo_note_1 = Note.create!(title: "My First Note", body: sample_text_1, notebook_id: demo_notebook_1.id)
demo_note_2 = Note.create!(title: "Cheese Mumbo Jumbo", body: sample_text_2, notebook_id: demo_notebook_1.id)
demo_note_3 = Note.create!(title: "Listicle Example", body: listicle_text, notebook_id: demo_notebook_2.id)
emoji_note_1 = Note.create!(title: "SORRY PAL", body: emoji_text_1, notebook_id: book_of_emoji.id)
emoji_note_2 = Note.create!(title: "HAPPY OR OTHERWISE", body: emoji_text_2, notebook_id: book_of_emoji.id)
emoji_note_3 = Note.create!(title: "WHOA", body: emoji_text_3, notebook_id: book_of_emoji.id)
emoji_note_4 = Note.create!(title: "FACE MASSAGES", body: emoji_text_4, notebook_id: book_of_emoji.id)
frodo_note = Note.create!(title: "To Dearest Frodo", body: gandalf_text_1, notebook_id: gandalf_book.id)
other_frodo_note = Note.create!(title: "Good Gandalf", body: gandalf_text_2, notebook_id: gandalf_book.id)

demo_tag_1 = Tag.create!(name: "kinda important", author_id: demo_user.id)
demo_tag_2 = Tag.create!(name: "cheesy", author_id: demo_user.id)
NoteTag.create!(note_id: demo_note_1.id, tag_id: demo_tag_1.id)
NoteTag.create!(note_id: demo_note_2.id, tag_id: demo_tag_1.id)
NoteTag.create!(note_id: demo_note_2.id, tag_id: demo_tag_2.id)

wisdom_tag = Tag.create!(name: "wisdom", author_id: demo_user.id)
NoteTag.create!(note_id: emoji_note_4.id, tag_id: wisdom_tag.id)
NoteTag.create!(note_id: frodo_note.id, tag_id: wisdom_tag.id)
NoteTag.create!(note_id: other_frodo_note.id, tag_id: wisdom_tag.id)
NoteTag.create!(note_id: other_frodo_note.id, tag_id: demo_tag_2.id)


Tag.create!(name: "another tag", author_id: demo_user.id)
Tag.create!(name: "taggy two tags", author_id: demo_user.id)
Tag.create!(name: "there\'s a new tag in town", author_id: demo_user.id)
