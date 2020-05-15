# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  full_name       :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    attr_reader :password
    after_initialize :ensure_session_token
    after_create :seed_defaults

    has_many :notebooks,
        foreign_key: :author_id,
        class_name: :Notebook

    has_many :notes,
        through: :notebooks,
        source: :notes

    has_many :tags,
        foreign_key: :author_id,
        class_name: :Tag

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return user if user && user.is_password?(password)
        nil
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.update!(session_token: User.generate_session_token)
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def seed_defaults
        notebook = self.notebooks.create!({name: 'My First Notebook'})
        note = notebook.notes.create!({title: 'My First Note', body: ''})
        tag = self.tags.create!({name: 'Important'})
        NoteTag.create({ note_id: note.id, tag_id: tag.id})
    end

end
