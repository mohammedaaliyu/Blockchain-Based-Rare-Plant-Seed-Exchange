;; Species Registration Contract
;; Records details of uncommon plant varieties

;; Data Variables
(define-data-var species-counter uint u0)

;; Data Maps
(define-map species
  { species-id: uint }
  {
    registrar: principal,
    scientific-name: (string-utf8 100),
    common-name: (string-utf8 100),
    region-of-origin: (string-utf8 100),
    rarity-level: uint,
    timestamp: uint
  }
)

;; Register a new plant species
(define-public (register-species
    (scientific-name (string-utf8 100))
    (common-name (string-utf8 100))
    (region-of-origin (string-utf8 100))
    (rarity-level uint))
  (let ((species-id (var-get species-counter)))
    (begin
      (map-set species
        { species-id: species-id }
        {
          registrar: tx-sender,
          scientific-name: scientific-name,
          common-name: common-name,
          region-of-origin: region-of-origin,
          rarity-level: rarity-level,
          timestamp: block-height
        }
      )
      (var-set species-counter (+ species-id u1))
      (ok species-id)
    )
  )
)

;; Get species details by ID
(define-read-only (get-species (species-id uint))
  (map-get? species { species-id: species-id })
)

;; Get the total number of registered species
(define-read-only (get-species-count)
  (var-get species-counter)
)

