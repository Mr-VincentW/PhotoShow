# 使用高级文件名替换符和替换符修饰器

浮图秀支持通过 **图片下载 → 文件名** 设置自定义图片下载的文件名。

本指南介绍：

- **[高级文件名替换符](#label-%E9%AB%98%E7%BA%A7%E6%96%87%E4%BB%B6%E5%90%8D%E6%9B%BF%E6%8D%A2%E7%AC%A6)**：从 **URL 搜索参数**或**页面内容**中提取信息。
- **[替换符修饰器](#wrench-%E6%9B%BF%E6%8D%A2%E7%AC%A6%E4%BF%AE%E9%A5%B0%E5%99%A8)**：在将支持的文件名替换符值插入生成的文件名之前，对其进行转换。

---

## :label: 高级文件名替换符

高级文件名替换符面向需要更高灵活性的用户，可用于生成更符合需求的图片下载文件名。

### 1. URL 搜索参数替换符

从当前页面 URL 的搜索参数中提取信息。

#### 语法

| 替换符 | 说明 |
| ------- | ---- |
| `<?parameter>` | 提取指定 URL 搜索参数的值。 |

#### 示例

假设当前页面的 URL 为：

```text
https://example.com/search?q=cats&page=2
```

则：

```text
<?q>       → cats
<?page>    → 2
```

典型用途包括提取搜索关键词、商品标识、分类名称，以及其他包含在 URL 搜索参数中的信息。

### 2. CSS 选择器替换符

使用 CSS 选择器从当前页面中提取文本或属性值。

#### 文档范围

在当前文档中进行查询。

<table>
  <thead>
    <tr>
      <th>替换符</th>
      <th>说明</th>
      <th>大致对应的代码</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;{target-selector}&gt;</code></td>
      <td>提取第一个匹配元素的文本内容。</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;{target-selector}[attribute]&gt;</code></td>
      <td>提取第一个匹配元素的属性值。</td>
      <td><pre><code>document
  .querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;[attribute]&gt;</code></td>
      <td>提取页面根元素（<code>&lt;html&gt;</code>）的属性值。</td>
      <td><pre><code>document
  .documentElement
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

示例：

```text
<{h1}>
<{meta[property="og:title"]}[content]>
<[lang]>
```

#### 上下文范围

相对于当前源缩略图进行查询。该元素通常为缩略图本身，但在某些情况下也可能是由浮图秀自动确定的其他关联元素。

<table>
  <thead>
    <tr>
      <th>替换符</th>
      <th>说明</th>
      <th>大致对应的代码</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;@{context-selector}&gt;</code></td>
      <td>提取最近匹配祖先元素的文本内容。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}[attribute]&gt;</code></td>
      <td>提取最近匹配祖先元素的属性值。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}&gt;</code></td>
      <td>提取最近匹配祖先元素内第一个匹配后代元素的文本内容。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.textContent</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@{context-selector}{target-selector}[attribute]&gt;</code></td>
      <td>提取最近匹配祖先元素内第一个匹配后代元素的属性值。</td>
      <td><pre><code>sourceThumbnail
  .closest(contextSelector)
  ?.querySelector(targetSelector)
  ?.getAttribute(attribute)</code></pre></td>
    </tr>
    <tr>
      <td><code>&lt;@[attribute]&gt;</code></td>
      <td>提取源缩略图元素自身的属性值。</td>
      <td><pre><code>sourceThumbnail
  .getAttribute(attribute)</code></pre></td>
    </tr>
  </tbody>
</table>

示例：

```text
<@{article}>
<@{article}{h2}>
<@{article}{img}[alt]>
<@{article}[data-id]>
<@[alt]>
```

典型用途包括提取商品名称、帖子标题、作者、图片 `alt` 文本、`<meta>` 标签内容以及自定义 `data-*` 属性等。

---

## :wrench: 替换符修饰器

替换符修饰器可在将文件名替换符生成的值插入最终文件名之前，对其进行转换。

> :information_source: 修饰器仅支持**文本类型的文件名替换符**。输出数值的替换符（例如表示**年份**的 `<y>` 或表示**图片宽度**的 `<iW>`）不支持修饰器。

### 语法

```text
<placeholder|modifier|modifier...>
```

示例：

```text
<T|80>
<C|120|lower>
<?id|upper>
<{h1}|100|lower>
```

### 支持的修饰器

| 修饰器 | 说明 |
| ------- | ---- |
| `<正整数>` | 限制替换符值（具体含义取决于替换符类型）。 |
| `lower` | 将值转换为小写。 |
| `upper` | 将值转换为大写。 |

### 数值修饰器

数值修饰器用于限制文件名替换符生成内容的长度。

- 对于大多数文本类型的文件名替换符，数值表示**最大字符数**。
- 对于页面路径替换符（`<P>` 和 `<p>`），数值表示**保留的最大路径段数**，以保留路径的语义结构。

例如，给定页面路径：

```text
/this/is/a/long/pathname
```

以下模式将产生：

```text
<P|4>  → this_is_a_long
<p|2>  → this/is
```

这样可以避免截断路径段，从而保留路径原有的结构和含义。

### 修饰器规范化处理

编辑文件名模式时，浮图秀会自动简化冗余或冲突的修饰器，在不改变最终结果的前提下，使文件名模式保持简洁。

示例：

```text
<c|80|upper|40> → <c|40|upper>

<c|upper|40|lower> → <c|40|lower>
```
