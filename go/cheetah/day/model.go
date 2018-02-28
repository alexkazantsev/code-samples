package day

import (
	"github.com/jinzhu/gorm"
)


func Create(conn *gorm.DB, data *Day) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
