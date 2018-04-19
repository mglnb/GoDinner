import gql from 'graphql-tag'
export const query = gql`
query restaurant ($id: Int!) {
  restaurant(id: $id)  {
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

export const UPDATE_RESTAURANT = gql`

mutation restaurantUpdate (
	$id: ID!,
	$name: String,
	$subname: String,
	$location: String,
	$number: Int,
	$phone_number: String,
	$cellphone_number: String,
	$cpnj: String,
	$avatar_url: String,
	$description: String,
	$email: String,
) {
		restaurantUpdate (
			id: $id,
			name: $name,
			subname: $subname,
			location: $location,
			number: $number,
			phone_number: $phone_number,
			cellphone_number: $cellphone_number,
			cpnj: $cpnj,
			avatar_url: $avatar_url,
			description: $description,
			email: $email
		) {
			id
			name
			subname
			location
			number
			phone_number
			cellphone_number
			cpnj
			avatar_url
			description
			user {
				id
				email
			}
		}
	}
`