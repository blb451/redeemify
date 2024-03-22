class CreateRedemptions < ActiveRecord::Migration[6.1]
  def change
    create_table :redemptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :reward, null: false, foreign_key: true

      t.timestamps
    end
  end
end
