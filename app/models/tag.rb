# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
    validates :name, presence: true, uniqueness: {scope: :author_id}

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :note_tags,
        foreign_key: :tag_id,
        class_name: :NoteTag

    has_many :notes,
        through: :note_tags
end
