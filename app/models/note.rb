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
    validates :title, :body, null: false

    belongs_to :notebook,
        foreign_key: :notebook_id,
        class_name: :Notebook

end
