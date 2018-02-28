package class

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
		class_id, err := strconv.ParseUint(id[0], 10, 64)
		if err != nil {
			fmt.Println("ERROR USER ID PARSING", id[0])
			return nil, err
		} else {
			return conn.Where(gorm.Model{ID: uint(class_id)}).Preload("Lesson").Preload("Teacher").First(&Class{}), nil
		}
	}
	var classes Classes
	return conn.Preload("Lesson").Preload("Teacher").Find(&classes), nil
}

func Register(conn *gorm.DB, classData *ClassRequestJSON) (*ClassResponseJSON, error) {
	newClass := Class{

		Building:    *classData.Building,
		RoomNum:     *classData.RoomNum,
		Even: 		 *classData.Even,
		LessonID:    *classData.LessonID,
					}

	err := conn.Create(&newClass).
		Preload("Lesson").
		Find(&newClass).Error
	if err != nil {
		return nil, error(err)
	}

	classJSON := ClassResponseJSON{
		Building:  newClass.Building,
		RoomNum:   newClass.RoomNum,
		Even:      newClass.Even,
		Lesson:		newClass.Lesson,
	}

	return &classJSON, nil

}

func Create(conn *gorm.DB, data *Class) *gorm.DB {
	return conn.Create(&data).Find(&data)
}