class Note < ActiveRecord::Base
  belongs_to :score
  belongs_to :user
end
