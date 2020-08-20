# == Schema Information
#
# Table name: notes
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  body        :text             not null
#  notebook_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Note < ApplicationRecord
    validates :body, null: false

    after_save :update_notebook

    belongs_to :notebook,
        foreign_key: :notebook_id,
        class_name: :Notebook

    has_many :note_tags,
        foreign_key: :note_id,
        class_name: :NoteTag

    has_many :tags,
        through: :note_tags

    private
        def update_notebook
            notebook = Notebook.find_by(id: notebook_id)
            notebook.touch
        end
end
