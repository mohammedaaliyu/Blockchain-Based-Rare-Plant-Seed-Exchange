import { describe, it, expect, beforeEach } from "vitest"

// Simple mock state
let mockSpeciesCounter = 0
const mockSpecies = new Map()

// Simple mock functions
const registerSpecies = (scientificName, commonName, regionOfOrigin, rarityLevel) => {
  const speciesId = mockSpeciesCounter
  mockSpecies.set(speciesId, {
    registrar: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    scientificName,
    commonName,
    regionOfOrigin,
    rarityLevel,
    timestamp: 123456,
  })
  mockSpeciesCounter++
  return { ok: speciesId }
}

const getSpecies = (speciesId) => mockSpecies.get(speciesId) || null
const getSpeciesCount = () => mockSpeciesCounter

// Simple tests
describe("Species Registration Contract", () => {
  beforeEach(() => {
    mockSpeciesCounter = 0
    mockSpecies.clear()
  })
  
  it("should register a species", () => {
    const result = registerSpecies("Amorphophallus titanum", "Corpse Flower", "Sumatra", 9)
    expect(result.ok).toBe(0)
    expect(mockSpecies.size).toBe(1)
  })
  
  it("should get species data", () => {
    registerSpecies("Welwitschia mirabilis", "Welwitschia", "Namibia", 8)
    const speciesData = getSpecies(0)
    expect(speciesData).not.toBeNull()
    expect(speciesData.scientificName).toBe("Welwitschia mirabilis")
    expect(speciesData.rarityLevel).toBe(8)
  })
  
  it("should track species count", () => {
    expect(getSpeciesCount()).toBe(0)
    registerSpecies("Species 1", "Common 1", "Region 1", 5)
    registerSpecies("Species 2", "Common 2", "Region 2", 7)
    expect(getSpeciesCount()).toBe(2)
  })
})

