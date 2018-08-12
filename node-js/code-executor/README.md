### `in::room::new-user-request`
> Request to join the room by room id

##### Params: 

```json
{
  "room_id": "String|Number",
  "user_id": "String|Number"
}
```

### `in::room::change-language`
> Request to change room language.

##### Prarams: 

```json
{
  "language": "String"
}
```

### `out::room::new-user`
> Notification everyone in the room that a new user was joined

##### Body:

```json
{
  "user_id": "String"
}
```

### `out::room::user-leave`
> Notification everyone in the room that the user leaves the room

##### Body:

```json
{
  "user_id": "String"
}
```

### `in::code::execute`
> Request to execute code

##### Params:

```json
{
  "code": "String"
}
```

### `out::stdout::send`
> Result of the execution

##### Body:

```json
{
  "data": "String"
}
```

### `out::stdou::error`
> Error of the execution

##### Body:

```json
{
  "error": "String"
}
```

### `in::stdin::send`
> Request to the process stdin

##### Params:

```json
{
  "message": "String"
}
```

### `admin::room::create`
> Request to create a new room.
> Note: Tou need to be in `/admin` room

##### Body:

```json
{
  "id": "String|Number",
  "token": "String"
}
```

### `admin::room::delete`
> Request to delete an existing room.
> Note: Tou need to be in `/admin` room

##### Body: 

```json
{
  "id": "String|Number"
}
```

## Future plans

- Rewrite all on TypeScript
