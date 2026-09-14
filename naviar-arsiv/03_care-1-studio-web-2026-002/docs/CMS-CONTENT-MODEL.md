# CMS içerik modeli — WEB-2026-002

`content/site-content.json`, mevcut prototipin içerik kaynağıdır. Üretimde bir CMS veya özel API’ye taşınırken aşağıdaki alanlar korunmalıdır.

## Koleksiyonlar

### Project

- `archiveId`
- `name`
- `defaultLanguage`
- `languages[]`
- `status`
- `booking`
- `payments`
- `email`
- `analytics`

### Service

- `id`
- `status`
- `title.nb`
- `title.en`
- `title.tr`
- `description.nb`
- `description.en`
- `description.tr`

### Journey step

- `id`
- `nb`
- `en`
- `tr`

## Yayın kuralları

- Bir içerik üç dilde eşdeğer metin olmadan yayınlanmamalı.
- `status` alanı `pilot-scope`, `planned`, `configured` veya `live` gibi açık bir değer taşımalı.
- Fiyat ve politika alanları boş/“belirlenecek” durumunu gösterebilmeli.
- Sağlık, kimlik ve başka özel veri alanları bu public içerik modeline eklenmemeli.
- CMS kullanıcılarının taslak ve yayın yetkileri ayrılmalı.
