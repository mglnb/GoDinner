import gql from 'graphql-tag'
export const query = gql`
query restaurant ($id: Int!){
  restaurant(id: $id) {
    id, name, subname, location, number, phone_number, cellphone_number, cpnj, avatar_url, description
		user { id, name, email }
		stars {
			id, star
			client { id, name, lastname }
		}
		bookings {
			id
			client { id name }
		}
		posts {
			id
			likes {
				user { id, name }
				liked
			}
			comments {
				user { id, name }
				comment
			}
		}
		menus { 
			id, type
			menu_options {
				price, id, name, ingredients
			}
		}
		tables {
			id, state
		}
	}
}
`