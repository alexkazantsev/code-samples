package faculty

import "github.com/jinzhu/gorm"

func Create(conn *gorm.DB, data *Faculty) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
