package schedule

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"strconv"
)

/**
 * Get schedules.
 */
func Fetch(conn *gorm.DB) (*gorm.DB, error) {
	var schedules Schedules
	scheds := conn.
	Preload("ScheduleDays").
	Preload("ScheduleDays.Day").
	Preload("ScheduleDays.Classes").
	Preload("ScheduleDays.Classes.Teacher").
	Preload("ScheduleDays.Classes.Lesson").
	Preload("Group").
	Find(&schedules)

	return scheds, nil
}


func FetchById(conn *gorm.DB, id ...string) (*gorm.DB, error) {
	group_id, err := strconv.ParseUint(id[0], 10, 64)
	if err != nil {
		fmt.Println("ERROR USER ID PARSING", id[0])
		return nil, err
	} else {
		sched := conn.
		Where("group_id = ?", uint(group_id)).
		Preload("ScheduleDays").
		Preload("ScheduleDays.Day").
		Preload("ScheduleDays.Classes").
		Preload("ScheduleDays.Classes.Teacher").
		Preload("ScheduleDays.Classes.Lesson").
		Preload("Group").
		First(&Schedule{})
		return sched, nil
	}
}




func Create(conn *gorm.DB, data *Schedule) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
