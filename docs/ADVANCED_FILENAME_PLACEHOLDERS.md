# Using Advanced Filename Placeholders and Placeholder Modifiers

PhotoShow allows downloaded images to be named using a customizable **filename pattern** under **Image Download → Filename** settings.

This guide covers:

- **[Advanced filename placeholders](#label-advanced-filename-placeholders)**, which extract values from **URL search parameters** and **webpage content**.
- **[Placeholder modifiers](#wrench-placeholder-modifiers)**, which transform supported placeholder values before they are inserted into the generated filename.

---

## :label: Advanced Filename Placeholders

Advanced filename placeholders are intended for power users who need greater flexibility when generating download filenames.

### 1. URL Search Parameter Placeholders

Extract values from the current page URL's search parameters.

#### Syntax

| Placeholder | Description |
| ----------- | ----------- |
| `<?parameter>` | Value of the specified URL search parameter. |

#### Examples

Assume the current page URL is:

```text
https://example.com/search?q=cats&page=2
```

Then:

```text
<?q>       → cats
<?page>    → 2
```

Typical use cases include search keywords, product identifiers, category names, and other information encoded in page URLs.

### 2. CSS Selector Placeholders

Extract text or attribute values from the current webpage using CSS selectors.

#### Document-scoped

Query within the current document.

<table>
  <thead>
    <tr>
      <th>Placeholder</th>
      <th>Description</th>
      <th>Roughly equivalent code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;{target-selector}&gt;</code></td>
      <td>Extracts the text content of the first matching element.</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;{target-selector}[attribute]&gt;</code></td>
      <td>Extracts an attribute value from the first matching element.</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;[attribute]&gt;</code></td>
      <td>Extracts an attribute value from the page's root (<code>&lt;html&gt;</code>) element.</td>
      <td><pre><code>document
  .documentElement
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

Examples:

```text
<{h1}>
<{meta[property="og:title"]}[content]>
<[lang]>
```

#### Context-scoped

Query relative to the current source thumbnail, which is typically the thumbnail element itself but may be another related element determined by PhotoShow.

<table>
  <thead>
    <tr>
      <th>Placeholder</th>
      <th>Description</th>
      <th>Roughly equivalent code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;@{context-selector}&gt;</code></td>
      <td>Extracts the text content of the closest matching ancestor.</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}[attribute]&gt;</code></td>
      <td>Extracts an attribute value from the closest matching ancestor.</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}&gt;</code></td>
      <td>Extracts the text content of the first matching descendant within the closest matching ancestor.</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}[attribute]&gt;</code></td>
      <td>Extracts an attribute value from the first matching descendant within the closest matching ancestor.</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@[attribute]&gt;</code></td>
      <td>Extracts an attribute value from the source thumbnail element itself.</td>
      <td><pre><code>sourceThumbnail
  .getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

Examples:

```text
<@{article}>
<@{article}{h2}>
<@{article}{img}[alt]>
<@{article}[data-id]>
<@[alt]>
```

Typical use cases include extracting product names, post titles, authors, image `alt` text, `<meta>` tag values, and custom `data-*` attributes.

---

## :wrench: Placeholder Modifiers

Placeholder modifiers transform the values produced by filename placeholders before they are inserted into the generated filename.

> :information_source: Modifiers are supported by text-based filename placeholders. Placeholders that produce numeric values (such as `<y>` for **year** or `<iW>` for **image width**) do not support modifiers.

### Syntax

```text
<placeholder|modifier|modifier...>
```

Examples:

```text
<T|80>
<C|120|lower>
<?id|upper>
<{h1}|100|lower>
```

### Supported Modifiers

| Modifier | Description |
| -------- | ----------- |
| `<positive integer>` | Limits the placeholder value (interpretation depends on the placeholder type). |
| `lower` | Converts the value to lowercase. |
| `upper` | Converts the value to uppercase. |

#### Numeric Modifier

The numeric modifier limits the amount of data produced by a filename placeholder.

- For most text-based filename placeholders, the numeric value represents the **maximum number of characters**.
- For pathname placeholders (`<P>` and `<p>`), the numeric value instead represents the **maximum number of pathname segments**, preserving the semantic structure of the pathname.

For example, given the pathname:

```text
/this/is/a/long/pathname
```

The following patterns produce:

```text
<P|4>  → this_is_a_long
<p|2>  → this/is
```

This avoids producing broken or meaningless partial path segments while remaining consistent with the purpose of these placeholders.

### Modifier Normalization

When editing filename patterns, PhotoShow automatically simplifies redundant or conflicting modifiers.

Examples:

```text
<c|80|upper|40> → <c|40|upper>

<c|upper|40|lower> → <c|40|lower>
```

This helps keep filename patterns concise without changing the resulting behavior.
