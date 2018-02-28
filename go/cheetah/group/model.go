package group

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
		group_id, err := strconv.ParseUint(id[0], 10, 64)
		if err != nil {
			fmt.Println("ERROR USER ID PARSING", id[0])
			return nil, err
		} else {
			return conn.Where(gorm.Model{ID: uint(group_id)}).First(&Group{}), nil
		}
	}
	var groups Groups
	return conn.Find(&groups), nil
}

func Create(conn *gorm.DB, data *Group) *gorm.DB {
	return conn.Create(&data).Find(&data)
}
