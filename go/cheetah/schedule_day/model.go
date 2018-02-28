package schedule_day

import (
	"github.com/jinzhu/gorm"
)


func Create(conn *gorm.DB, data *ScheduleDay) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
