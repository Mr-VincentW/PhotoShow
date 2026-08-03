# 使用進階檔名替代符與替代符修飾器

浮圖秀支援透過 **圖片下載 → 檔名** 設定中的**檔名模式**，自訂圖片下載的檔名。

本指南介紹：

- **[進階檔名替代符](#label-%E9%80%B2%E9%9A%8E%E6%AA%94%E5%90%8D%E6%9B%BF%E4%BB%A3%E7%AC%A6)**：從 **URL 搜尋參數**或**頁面內容**中擷取資訊。
- **[替代符修飾器](#wrench-%E6%9B%BF%E4%BB%A3%E7%AC%A6%E4%BF%AE%E9%A3%BE%E5%99%A8)**：在將支援的檔名替代符值插入產生的檔名之前，對其進行轉換。

---

## :label: 進階檔名替代符

進階檔名替代符適用於需要更高彈性的使用者，可用於產生更符合需求的圖片下載檔名。

### 1. URL 搜尋參數替代符

從目前頁面 URL 的搜尋參數中擷取資訊。

#### 語法

| 替代符 | 說明 |
| ------- | ---- |
| `<?parameter>` | 擷取指定 URL 搜尋參數的值。 |

#### 範例

假設目前頁面的 URL 為：

```text
https://example.com/search?q=cats&page=2
```

則：

```text
<?q>       → cats
<?page>    → 2
```

典型用途包括擷取搜尋關鍵字、商品識別碼、分類名稱，以及其他包含在 URL 搜尋參數中的資訊。

### 2. CSS 選擇器替代符

使用 CSS 選擇器從目前頁面中擷取文字或屬性值。

#### 文件範圍

在目前文件中進行查詢。

<table>
  <thead>
    <tr>
      <th>替代符</th>
      <th>說明</th>
      <th>大致對應的程式碼</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;{target-selector}&gt;</code></td>
      <td>擷取第一個符合元素的文字內容。</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;{target-selector}[attribute]&gt;</code></td>
      <td>擷取第一個符合元素的屬性值。</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;[attribute]&gt;</code></td>
      <td>擷取頁面根元素（<code>&lt;html&gt;</code>）的屬性值。</td>
      <td><pre><code>document
  .documentElement
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

範例：

```text
<{h1}>
<{meta[property="og:title"]}[content]>
<[lang]>
```

#### 上下文範圍

相對於目前來源縮圖進行查詢。該元素通常為縮圖本身，但在某些情況下也可能是由浮圖秀自動判斷的其他關聯元素。

<table>
  <thead>
    <tr>
      <th>替代符</th>
      <th>說明</th>
      <th>大致對應的程式碼</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;@{context-selector}&gt;</code></td>
      <td>擷取最近符合祖先元素的文字內容。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}[attribute]&gt;</code></td>
      <td>擷取最近符合祖先元素的屬性值。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}&gt;</code></td>
      <td>擷取最近符合祖先元素內第一個符合後代元素的文字內容。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}[attribute]&gt;</code></td>
      <td>擷取最近符合祖先元素內第一個符合後代元素的屬性值。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@[attribute]&gt;</code></td>
      <td>擷取來源縮圖元素本身的屬性值。</td>
      <td><pre><code>sourceThumbnail
  .getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

範例：

```text
<@{article}>
<@{article}{h2}>
<@{article}{img}[alt]>
<@{article}[data-id]>
<@[alt]>
```

典型用途包括擷取商品名稱、貼文標題、作者、圖片 `alt` 文字、`<meta>` 標籤內容以及自訂 `data-*` 屬性等。

---

## :wrench: 替代符修飾器

替代符修飾器可在將檔名替代符產生的值插入最終檔名之前，對其進行轉換。

> :information_source: 修飾器僅支援**文字類型的檔名替代符**。輸出數值的替代符（例如表示**年份**的 `<y>` 或表示**圖片寬度**的 `<iW>`）不支援修飾器。

### 語法

```text
<placeholder|modifier|modifier...>
```

範例：

```text
<T|80>
<C|120|lower>
<?id|upper>
<{h1}|100|lower>
```

### 支援的修飾器

| 修飾器 | 說明 |
| ------- | ---- |
| `<正整數>` | 限制替代符值（具體含義取決於替代符類型）。 |
| `lower` | 將值轉換為小寫。 |
| `upper` | 將值轉換為大寫。 |

### 數值修飾器

數值修飾器用於限制檔名替代符產生內容的長度。

- 對於大多數文字類型的檔名替代符，數值表示**最大字元數**。
- 對於頁面路徑替代符（`<P>` 和 `<p>`），數值表示**保留的最大路徑區段數**，以保留路徑的語意結構。

例如，給定頁面路徑：

```text
/this/is/a/long/pathname
```

以下模式將產生：

```text
<P|4>  → this_is_a_long
<p|2>  → this/is
```

這樣可避免截斷路徑區段，從而保留路徑原有的結構與含義。

### 修飾器規範化處理

編輯檔名模式時，浮圖秀會自動簡化冗餘或衝突的修飾器，在不改變最終結果的前提下，使檔名模式保持簡潔。

範例：

```text
<c|80|upper|40> → <c|40|upper>

<c|upper|40|lower> → <c|40|lower>
```