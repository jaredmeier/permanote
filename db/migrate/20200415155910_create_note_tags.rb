class CreateNoteTags < ActiveRecord::Migration[5.2]
  def change
    create_table :note_tags do |t|
      t.integer :note_id, null: false
      t.integer :tag_id, null: false
    end
    add_index :note_tags, [:note_id, :tag_id], unique: true
  end
end
