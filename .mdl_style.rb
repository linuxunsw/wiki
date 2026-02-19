all
rule 'MD029', style: :ordered

exclude_rule 'MD002' # This conflicts with the way we generate HTML from markdown.
exclude_rule 'MD013' # Line length limits hold you back.
exclude_rule 'MD026' # Trailing punctuation in headers can be grammatically useful.
exclude_rule 'MD032' # This conflicts with the way we generate HTML from markdown if we have multiple authors.
exclude_rule 'MD034' # Sometimes a bare URL is exactly what you want.
exclude_rule 'MD036' # We purposefully use emphases instead of headers sometimes.
exclude_rule 'MD041' # This conflicts with the way we generate HTML from markdown.
