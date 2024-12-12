import style from './feedEntry.module.css';
import tableStyle from './feedEntryTable.module.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Media from '../media/Media';

const FeedEntry = ({id,entry}) => {

    const {title,selftext,selftext_html,author,media,subreddit} = entry;

    const textArea = {
        width:"100%",
        marginTop: "1em"
    }

    const markdownParse = markdown => {

        markdown = markdown.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');
        markdown = markdown.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
        markdown = markdown.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
        markdown = markdown.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        markdown = markdown.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        markdown = markdown.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Parse bold (e.g., **bold** or __bold__)
        markdown = markdown.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

        // Parse italic (e.g., *italic* or _italic_)
        markdown = markdown.replace(/([*_])([^*_]+?)\1/g, '<em>$2</em>');

        // Parse links (e.g., [link](http://example.com))
        markdown = markdown.replace(/\[([^\[]+)\]\((.*?)\)/g, '<a href="$2">$1</a>');

        // Parse images (e.g., ![alt text](image.jpg))
        markdown = markdown.replace(/!\[([^\[]+)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

        // Parse tables
        markdown = markdown.replace(/(\|([^\|]*\|)+)(\n|$)/g, (match) => {
            const rows = match.trim().split('\n').map(row => row.trim());

            // Start building the HTML table
            let html = '<table border="1"><thead>';

            // Handle header row (first row)
            const headerRow = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell);
            headerRow.forEach(cell => {
            html += `<th>${cell}</th>`;
            });
            html += '</thead><tbody>';

            // Check if there is a separator row (e.g., |:---------|), which should be skipped
            if (rows[1] && rows[1].startsWith('|:')) {
            rows.shift();  // Remove the separator row
            }

            // Handle data rows
            rows.forEach(row => {
            const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
            if (cells.length > 0) {
                html += '<tr>';
                cells.forEach(cell => {
                // Convert markdown links within table cells (e.g., [Home page](https://url.com))
                cell = cell.replace(/\[([^\[]+)\]\((.*?)\)/g, '<a href="$2">$1</a>');
                html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            }
            });

            html += '</tbody></table>';
            return html;
        });

        // Parse paragraphs (anything else is treated as a paragraph)
        markdown = markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, ' ').trim();
        markdown = `<p>${markdown}</p>`;

        return (<div dangerouslySetInnerHTML={{__html: markdown.trim()}}></div>)
    }

    //{selftext ? <div style={textArea}>{markdownParse(selftext)}</div> : null}

    const decode = text => {
        if(text){
            return text.replace(/&#39;/g,'\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace();
        }
    }

    const decodedSelfText = decode(selftext_html);
    const decodedTitle = decode(title);

    return (
        <div id={id} className={style.feedEntry}>
            <div className={style.title}>
                <h3>{"r/"+subreddit}</h3>
                <h3>{"u/"+author}</h3>
                <h2>{decodedTitle}</h2>
            </div>
            <div className={style.content}>
                {media ? <Media media={media}/> : undefined}
                {selftext ? <div style={textArea} dangerouslySetInnerHTML={{__html: decodedSelfText.trim()}}></div> : null}
            </div>
        </div>
    )
}

export default FeedEntry;
