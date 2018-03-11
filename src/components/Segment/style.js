import { StyleSheet } from 'react-native';
import variables from '../../utils/platform';


export default {
  segment: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: variables.borderWidth,
    borderColor: variables.brand_primary,
    borderRadius: variables.radius_md,
  },
  item: {
    flex: 1,
    paddingVertical: variables.h_spacing_sm,
    borderLeftWidth: variables.borderWidth,
    borderRightWidth: variables.borderWidth,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeftRadius: {
    borderTopLeftRadius: variables.radius_md,
    borderBottomLeftRadius: variables.radius_md,
  },
  itemRightRadius: {
    borderTopRightRadius: variables.radius_md,
    borderBottomRightRadius: variables.radius_md,
  },
  itemText: {
    textAlign: 'center',
    fontSize: variables.font_size_caption_sm,
  },
};
