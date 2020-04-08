# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Notebook < ApplicationRecord
    validates :name, presence: true, uniqueness: {scope: :author_id}

    has_many :notes,
        foreign_key: :notebook_id,
        class_name: :Note

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
end
