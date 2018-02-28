package login

import (
	"bytes"
	"cheetah/app_utils"
	"cheetah/user"
	"encoding/gob"
	"errors"
	"fmt"
	"github.com/Sirupsen/logrus"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"time"
)

const SecretKey string = "WOW,MuchShibe,ToDogge"

func LoginUser(conn *gorm.DB, loginData *LoginJSON) (*TokenJSON, error) {
	fmt.Println("LOGIN USER MODEL")
	_user, err := user.FetchByEmail(conn, loginData.Email)
	if err != nil {
		return nil, errors.New("User not found!")
	}

	isCompare := app_utils.ComparePass(loginData.Password, _user.Account.Password)

	if !isCompare {
		return nil, errors.New("User email or password is not correct!")
	}

	// If user already have token and token is not expired - make token expired and generate new one.
	// Else - just create new token.
	var tokenR Token
	_err := conn.Table("Token").
		Preload("User").
		Where("user_id = ?", _user.ID).
		Where("expired = ?", false).
		First(&tokenR).
		Error

	if _err == nil {
		tokenR.Expired = true
		conn.Save(&tokenR)
	}

	logrus.Infoln("START CREATING NEW TOKEN...")

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims["userId"] = _user.ID

	token.Claims["iat"] = time.Now().Unix()
	token.Claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, _err := token.SignedString([]byte(SecretKey))

	if _err != nil {
		fmt.Println("ERROR", _err)
	}

	newToken := Token{
		UserID: _user.ID,
		Token:  tokenString,
	}

	conn.Create(&newToken)

	return &TokenJSON{Token: newToken.Token, User: &user.UserResponseJSON{
		FirstName:  _user.FirstName,
		LastName:   _user.LastName,
		Email:      _user.Account.Email,
		University: _user.University,
		Faculty:    _user.Faculty,
		Department: _user.Department,
		Group:      _user.Group,
	}}, nil
}


func LoginUserVK(conn *gorm.DB, loginData *LoginJSON) (*TokenJSON, error) {
	fmt.Println("LoginUserVK")
	_user, err := user.FetchByVK(conn, loginData.Email)
	if err != nil {
		return nil, errors.New("User not found!")
	}

	// If user already have token and token is not expired - make token expired and generate new one.
	// Else - just create new token.
	var tokenR Token
	_err := conn.Table("Token").
	Preload("User").
	Where("user_id = ?", _user.ID).
	Where("expired = ?", false).
	First(&tokenR).
	Error

	if _err == nil {
		tokenR.Expired = true
		conn.Save(&tokenR)
	}

	logrus.Infoln("START CREATING NEW TOKEN...")

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims["userId"] = _user.ID

	token.Claims["iat"] = time.Now().Unix()
	token.Claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, _err := token.SignedString([]byte(SecretKey))

	if _err != nil {
		fmt.Println("ERROR", _err)
	}

	newToken := Token{
		UserID: _user.ID,
		Token:  tokenString,
	}

	conn.Create(&newToken)

	return &TokenJSON{Token: newToken.Token, User: &user.UserResponseJSON{
		FirstName:  _user.FirstName,
		LastName:   _user.LastName,
		Email:      _user.Account.Email,
		University: _user.University,
		Faculty:    _user.Faculty,
		Department: _user.Department,
		Group:      _user.Group,
	}}, nil
}

//TODO(alex_kazantsev): move to middleware.
func parseToken(conn *gorm.DB, userId uint) (*Token, error) {

	var tokenR Token
	err := conn.Table("Token").
		Preload("User").
		Where("user_id = ?", userId).
		Where("expired = false").
		First(&tokenR).
		Error

	if err != nil {
		logrus.Infoln("ERROR TOKEN GET :: ", err)
		return nil, err
	} else {
		tokenR.Expired = true
		conn.Save(&tokenR)
		return &tokenR, nil
	}

	logrus.Infoln("TOKEN :: ", tokenR.Token)

	token, err := jwt.Parse(tokenR.Token, func(token *jwt.Token) (interface{}, error) {

		logrus.Infoln("TOKEN CALLBACK :: ", token.Claims)

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

	//If token is exist and valid = just update expired time...
	token.Claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		return nil, err
	}
	tokenR.Token = tokenString
	conn.Save(&tokenR)

	logrus.Infoln("ENCODED TOKEN :: ", token.Claims["userId"])

	//return token struct with error as nil
	return &tokenR, nil
}
