package login

import (
	"cheetah/user"
	"github.com/jinzhu/gorm"
)

type Token struct {
	gorm.Model
	User    user.User
	UserID  uint
	Token   string
	Expired bool `default:"false"`
}

type TokenJSON struct {
	Token string                 `json:"token"`
	User  *user.UserResponseJSON `json:"user"`
}

type LoginJSON struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	VkID	 string	`json:"vk_id"`
}
