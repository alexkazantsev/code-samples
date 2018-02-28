package db_provider

import (
	//"cheetah/migrations"
	log "github.com/Sirupsen/logrus"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"time"
)

type Model struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
}

func Connect() *gorm.DB {
	conn, err := gorm.Open("mysql", "root:@/my_table?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		log.Errorln("Error db connection ===>>> ", err)
	}

	conn.DB()
	conn.LogMode(true)
	conn.SingularTable(true)
	//migrations.Migrate(conn)
	return conn
}
