package university

import (
	"github.com/jinzhu/gorm"
)

func Create(conn *gorm.DB, data *University) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
