package lesson

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"strconv"
)

/**
 * Get users.
 */
func Fetch(conn *gorm.DB, id ...string) (*gorm.DB, error) {
	if len(id) > 0 {
		lesson_id, err := strconv.ParseUint(id[0], 10, 64)
		if err != nil {
			fmt.Println("ERROR USER ID PARSING", id[0])
			return nil, err
		} else {
			return conn.Where(gorm.Model{ID: uint(lesson_id)}).First(&Lesson{}), nil
		}
	}
	var lessons Lessons
	return conn.Find(&lessons), nil
}

func Create(conn *gorm.DB, data *Lesson) *gorm.DB {
	return conn.Create(&data).Find(&data)
}