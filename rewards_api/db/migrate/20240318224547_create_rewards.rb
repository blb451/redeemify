class CreateRewards < ActiveRecord::Migration[6.1]
  def change
    create_table :rewards do |t|
      t.string :name
      t.integer :points_required
      t.string :image_url

      t.timestamps
    end
  end
end
