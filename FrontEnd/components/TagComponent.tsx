import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface TagProps extends TouchableOpacityProps {
  selected: boolean;
  label: string;
  // size?: 'small' | 'medium';
  icon?: 'location-pin' | 'email';
  iconSize?: number;
  iconColor?: string;
}

const TagComponent = ({
  selected,
  label,
  style,
  icon,
  iconSize,
  iconColor,
}: any) => (
  // @ts-ignore
  <TouchableOpacity activeOpacity={0.7}>
    <View style={[styles.tag, selected && styles.tagSelected, style]}>
      {icon && <Entypo name={icon} size={iconSize} color={iconColor} />}
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tag: {
    borderRadius: 20,
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  tagSelected: {
    backgroundColor: '#3498db',
  },

  tagText: {
    color: '#333',
    fontSize: 12,
  },

  tagTextSelected: {
    color: '#fff',
  }
});

export default TagComponent;