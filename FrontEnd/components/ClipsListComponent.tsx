import { FlatList } from 'react-native';

import { clipsFeatured } from '../hardcode/clips';
import Clip from '../interfaces/clip-interface';
import PreviewClipComponent from './PreviewClipComponent';

export default function ClipsListComponent(props: {
    onSelectClip: (c: Clip) => void;
    clips?: Clip[]
}) {
    return (
        <FlatList
            data={props.clips ?? clipsFeatured}
            renderItem={({ item }: { item: Clip }) => <PreviewClipComponent item={item} {...props} />}
            keyExtractor={(_, index) => String(index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
}