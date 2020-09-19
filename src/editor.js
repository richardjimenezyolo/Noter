import EditorJS 	from '@editorjs/editorjs';
import Header 		from '@editorjs/header';
import SimpleImage 	from '@editorjs/simple-image';
import CheckList 	from '@editorjs/checklist';
import List 		from '@editorjs/list';

export default function() {
    return new EditorJS({
        tools: {
            paragraph: {
                config: {
                    placeholder: 'Write something Cool...😎'
                }
            },
            header: Header,
            checklist: CheckList,
            list: List,
            image: SimpleImage
        }
    })
}

export const Load = data => {
    return new EditorJS({
        tools: {
            paragraph: {
                config: {
                    placeholder: 'Write something Cool...😎'
                }
            },
            header: Header,
            checklist: CheckList,
            list: List,
            image: SimpleImage
        },
        data: data
    })
}