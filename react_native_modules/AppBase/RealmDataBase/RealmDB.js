
const Realm = require('realm');


/************************************************Example*****************************************/
function _testRealmDB() {
    const CarSchema = {
        name: 'Car',
        properties: {
            make: 'string',
            model: 'string',
            miles:{type:'int', default: 0},
        }
    };

    const PersonSchema = {
        name: 'Person',
        primaryKey:'name',                                  //set primary Key
        properties: {
            name : 'string',                                //required property
            birthday: {type:'date', optional:true},         //optional property
            cars: 'Car[]',                                  //{type:'list' objectType:'Car'}
            picture: 'data?',                                //optional property
            testScores: 'double?[]',                         //List Properties
            firstName:{type:'string', indexed:true}
        }
    };


    const BookSchema = {
        name: 'Book',
        primaryKey: 'id',
        properties: {
            id:    'int',    // primary key
            title: 'string',
            price: 'float'
        }
    };

    Realm.open({schema:[CarSchema, PersonSchema, BookSchema]})
        .then(realm =>{

            console.log('Realm Path:'+Realm.defaultPath);

            /*
            ** Creating Objects
             */
            realm.write(()=>{
                const myCar = realm.create('Car', {
                    make:'Honda',
                    model:'Civic',
                    miles:1000,
                },true);
                myCar.miles +=20;
            });

            const cars = realm.objects('Car').filtered('miles > 1000');


            /*
            *** Creating and Updating Objects With Primary Keys
             */

            realm.write(() => {
                // Create a book object
                realm.create('Book', {id: 1, title: 'Recipes', price: 35});

                // Update book with new price keyed off the id
                realm.create('Book', {id: 1, price: 55}, true);
            });

            /*
            **** Deleting Objects
             */
            realm.write(() => {
                // Create a book object
                let book = realm.create('Book', {id: 1, title: 'Recipes', price: 35});

                // Delete the book
                realm.delete(book);

                // Delete multiple books by passing in a `Results`, `List`,
                // or JavaScript `Array`
                let allBooks = realm.objects('Book');
                realm.delete(allBooks); // Deletes all books
            });

            /*
            *** Queries
             */

            let dogs = realm.objects('Dog');
            let tanDogs = dogs.filtered('color = "tan" AND name BEGINSWITH "B"');




        })
        .catch(error => {
            console.log(error);
        })
}

/**********************************************************************************************/