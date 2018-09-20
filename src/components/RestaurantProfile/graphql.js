import gql from 'graphql-tag'
export const query = gql`
query restaurant ($id: Int!) {
  restaurant(id: $id)  {
    id, name, subname, location, number, phone_number, cellphone_number, cpnj, avatar_url, description
		user { id, name, email }
		orders {
			id
			menu_options {
				id
				name
				price
			}
			restaurant_tables {
				id
			}
			client {
				name
				avatar_url
			}
			star
		}
		bookings {
			id
			client { id name }
		}
		posts {
			id
			image_url
			content
			title
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
			id, state, table_number, qr_code
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

export const ALTER_PASSWORD = gql`
	mutation($id: ID! $old_password: String! $new_password: String!) {
		resetPassword(id:$id old_password: $old_password new_password:$new_password)
	}
`

export const ALTER_AVATAR = gql`
	mutation($avatar_url: String!, $id: ID!) {
		restaurantUpdate(avatar_url: $avatar_url, id: $id) {
			avatar_url
			id
		}
	}
`