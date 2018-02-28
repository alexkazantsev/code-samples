package account

import "github.com/jinzhu/gorm"

type Account struct {
	gorm.Model
	Password string `sql:"not null" json:"password"`
	Email    string `sql:"not null; unique" json:"email"`
	UserID   uint   `json:"user_id"` //foreign key
	VkID	 uint	`json:"vk_id"`
}

type Accounts []Account
