import { FlatList } from 'react-native';

import { CLIPS } from '../hardcode/clips';
import Clip from '../interfaces/clip-interface';
import PreviewClipComponent from './PreviewClipComponent';

export default function ClipsListComponent(props: {
    onSelectClip: (c: Clip) => void;
}) {
    return (
        <FlatList
            data={CLIPS}
            renderItem={({ item }: { item: Clip }) => <PreviewClipComponent item={item} {...props} />}
            keyExtractor={(_, index) => String(index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
}