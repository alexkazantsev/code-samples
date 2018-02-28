package group

import (
	"github.com/jinzhu/gorm"
)

type Group struct {
	gorm.Model
	Name         string `json:"name"`
}

type Groups []Group

type GroupResponseJSON struct {
	Name      string           `json:"name"`
}

type GroupRequestJSON struct {
	Name      *string   `json:"name"`
}
