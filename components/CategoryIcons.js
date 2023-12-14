import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// Function to determine the icon based on category
function getIconName(category) {
    switch (category) {
      case 'Food':
        return <Ionicons name="fast-food-outline" size={26} color="black" />;
      case 'Grocery':
        return <MaterialIcons name="local-grocery-store" size={26} color="black" />;
      case 'Travel':
        return <MaterialIcons name="card-travel" size={26} color="black" />;
      case 'Clothing':
        return <MaterialCommunityIcons name="tshirt-crew-outline" size={26} color="black" />;
      case 'Furniture':
        return <MaterialCommunityIcons name="table-furniture" size={26} color="black" />;
      case 'Sport':
        return <MaterialIcons name="sports-tennis" size={26} color="black" />;
      case 'Entertainment':
        return <Ionicons name="game-controller-outline" size={26} color="black" />;
      case 'Health and Wellness':
        return <FontAwesome5 name="hospital-user" size={26} color="black" />;
      case 'Housing':
        return <MaterialCommunityIcons name="home-circle-outline" size={26} color="black" />;
      case 'Education':
        return <Entypo name="open-book" size={26} color="black" />;
      case 'Miscellaneous':
        return <MaterialIcons name="miscellaneous-services" size={26} color="black" />;
      case 'Gifts and Celebrations':
        return <Feather name="gift" size={26} color="black" />;
      default:
        return <FontAwesome name="money" size={26} color="black" />;
    }
  }

  export default getIconName;