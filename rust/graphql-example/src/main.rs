#[macro_use] extern crate juniper;

use juniper::{FieldResult};

#[derive(GraphQLEnum)]
enum Episode {
    NewHope,
    Empire,
    Jedi,
}

#[derive(GraphQLObject)]
#[graphql(description="A humanoid creature in the Star Wars universe")]
struct Human {
    id: String,
    name: String,
    appears_in: Vec<Episode>,
    home_planet: String,
}

// There is also a custom derive for mapping GraphQL input objects.

#[derive(GraphQLInputObject)]
#[graphql(description="A humanoid creature in the Star Wars universe")]
struct NewHuman {
    name: String,
    appears_in: Vec<Episode>,
    home_planet: String,
}

// Now, we create our root Query and Mutation types with resolvers by using the
// graphql_object! macro.
// Objects can have contexts that allow accessing shared state like a database
// pool.

struct Context {
    // Use your real database pool here.
    pool: DatabasePool,
}

// To make our context usable by Juniper, we have to implement a marker trait.
impl juniper::Context for Context {}

struct Query;

graphql_object!(Query: Context |&self| {

    field apiVersion() -> &str {
        "1.0"
    }

    // Arguments to resolvers can either be simple types or input objects.
    // The executor is a special (optional) argument that allows accessing the context.
    field human(&executor, id: String) -> FieldResult<Human> {
        // Get the context from the executor.
        let context = executor.context();
        // Get a db connection.
        let connection = context.pool.get_connection()?;
        // Execute a db query.
        // Note the use of `?` to propagate errors.
        let human = connection.find_human(&id)?;
        // Return the result.
        Ok(human)
    }
});

struct Mutation;

graphql_object!(Mutation: Context |&self| {

    field createHuman(&executor, new_human: NewHuman) -> FieldResult<Human> {
        let db = executor.context().pool.get_connection()?;
        let human: Human = db.insert_human(&new_human)?;
        Ok(human)
    }
});

// A root schema consists of a query and a mutation.
// Request queries can be executed against a RootNode.
type Schema = juniper::RootNode<'static, Query, Mutation>;


fn main() {
    println!("Hello, world!");
}
