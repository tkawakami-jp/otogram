class Score < ActiveRecord::Base
  belongs_to :owner, :class_name => "User"
  validates :name, presence: true

  has_many :notes, dependent: :destroy
  accepts_nested_attributes_for :notes, allow_destroy: true
end
