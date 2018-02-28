package main

import (
	"cheetah/db_provider"
	"cheetah/login"
	"cheetah/user"
	"cheetah/lesson"
	"cheetah/schedule"
	"cheetah/class"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/dgrijalva/jwt-go"
	"bytes"
	"encoding/gob"


	"strings"
	"fmt"
)

var r *gin.Engine

/**
 * Push connection into git context.
 */
func ApiMiddleware(conn *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("conn", conn)
		ctx.Next()
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
		)
		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(200)
			return
		}
		ctx.Next()
	}
}

func ValidationMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		fmt.Println("test")
		var method string = strings.ToLower(ctx.Request.Method)
		if method == "put" || method == "post" || method == "get"{
			fmt.Println("Entered here")
			tokenR := ctx.Request.Header.Get("Authorization")
			_, err := jwt.Parse(tokenR, func(token *jwt.Token) (interface{}, error) {

				//logrus.Infoln("TOKEN CALLBACK :: ", token.Claims)

				if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}

				var buf bytes.Buffer
				enc := gob.NewEncoder(&buf)
				err := enc.Encode(token)
				if err != nil {
					return nil, fmt.Errorf("ENCODED ERROR :: %v", err)
				}

				return buf.Bytes(), nil
			})
			if err == nil{
				//fmt.Println("FOOO")
				ctx.Next()

			}else{
				//fmt.Println("FOOO 2")
				//fmt.Println(err)
			}

			//TODO(alex_kazantsev): do validation every time when someone wants go to route with `POST` or `PUT` methods.
			//TODO(alex_kazantsev): need implement some json schema validator or something like that.

		}
	}
}

type Group struct {
	Name   string
	Router func(*gin.RouterGroup)
}

type Groups []Group

var groups = Groups{
	Group{
		Name:   "/user",
		Router: user.Router,
	},
	Group{
		Name:   "/login",
		Router: login.Router,
	},
	Group{
		Name:   "/lesson",
		Router: lesson.Router,
	},
	Group{
		Name:	"/schedule",
		Router:	schedule.Router,
	},
	Group{
		Name:	"/class",
		Router:	class.Router,

	},
}

func init() {
	r = gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	conn := db_provider.Connect()

	r.Use(CORSMiddleware())
	r.Use(ValidationMiddleware())
	r.Use(ApiMiddleware(conn))
}

func main() {

	/**
	 * Initialize all group routers.
	 */
	for _, group := range groups {
		var handler func(*gin.RouterGroup)

		handler = group.Router
		handler(r.Group(group.Name))
	}

	r.Run(":8080")
}
