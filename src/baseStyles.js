import { injectGlobal } from 'styled-components';

const baseStyles = () => injectGlobal`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video,
    button {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-weight: normal;
        font: inherit;
        vertical-align: baseline;
        outline: none;
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }

    *,
    *::after,
    *::before {
        box-sizing: inherit;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        line-height: 1.5;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 1.6rem;
    }
`;

export default baseStyles;
