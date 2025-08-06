package batch_mail

import (
	"math/rand"
	"regexp"
	"strings"
	"time"
)

// SpintaxParser Spintax parser
type SpintaxParser struct {
	random *rand.Rand
}

// NewSpintaxParser Create a new Spintax parser
func NewSpintaxParser() *SpintaxParser {
	return &SpintaxParser{
		random: rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

// ParseSpintax Parse Spintax syntax
// Supported format: {option1|option2|option3}
// Example: "Hello {{FirstName}}, I {want|thought|hope} to contact you..."
func (p *SpintaxParser) ParseSpintax(content string) string {
	return content
	//// Match {option1|option2|option3} format
	//spintaxRegex := regexp.MustCompile(`\{([^}]+)\}`)
	//
	//return spintaxRegex.ReplaceAllStringFunc(content, func(match string) string {
	//	// Extract content inside braces
	//	optionsStr := match[1 : len(match)-1]
	//
	//	options := strings.Split(optionsStr, "|")
	//
	//	for i, option := range options {
	//		options[i] = strings.TrimSpace(option)
	//	}
	//
	//	validOptions := make([]string, 0)
	//	for _, option := range options {
	//		if option != "" {
	//			validOptions = append(validOptions, option)
	//		}
	//	}
	//
	//	// If no valid options exist, return the original text
	//	if len(validOptions) == 0 {
	//		return match
	//	}
	//
	//	// Randomly select an option
	//	selectedIndex := p.random.Intn(len(validOptions))
	//	return validOptions[selectedIndex]
	//})
}

// ParseSpintaxWithSeed Parse Spintax with a specified seed (used for testing or reproducible results)
func (p *SpintaxParser) ParseSpintaxWithSeed(content string, seed int64) string {

	r := rand.New(rand.NewSource(seed))

	// Match {option1|option2|option3} format
	spintaxRegex := regexp.MustCompile(`\{([^}]+)\}`)

	return spintaxRegex.ReplaceAllStringFunc(content, func(match string) string {

		optionsStr := match[1 : len(match)-1]

		options := strings.Split(optionsStr, "|")

		for i, option := range options {
			options[i] = strings.TrimSpace(option)
		}

		validOptions := make([]string, 0)
		for _, option := range options {
			if option != "" {
				validOptions = append(validOptions, option)
			}
		}

		if len(validOptions) == 0 {
			return match
		}

		selectedIndex := r.Intn(len(validOptions))
		return validOptions[selectedIndex]
	})
}

// HasSpintax Check if the content contains Spintax syntax
func (p *SpintaxParser) HasSpintax(content string) bool {
	spintaxRegex := regexp.MustCompile(`\{([^}]+)\}`)
	return spintaxRegex.MatchString(content)
}

// GetSpintaxOptions Get all Spintax options (used for preview)
func (p *SpintaxParser) GetSpintaxOptions(content string) map[string][]string {
	spintaxRegex := regexp.MustCompile(`\{([^}]+)\}`)
	matches := spintaxRegex.FindAllStringSubmatch(content, -1)

	result := make(map[string][]string)
	for _, match := range matches {
		if len(match) >= 2 {
			original := match[0]
			optionsStr := match[1]

			options := strings.Split(optionsStr, "|")

			validOptions := make([]string, 0)
			for _, option := range options {
				option = strings.TrimSpace(option)
				if option != "" {
					validOptions = append(validOptions, option)
				}
			}

			result[original] = validOptions
		}
	}

	return result
}

// Global Spintax parser instance
var defaultSpintaxParser = NewSpintaxParser()

// GetSpintaxParser Get the default Spintax parser instance
func GetSpintaxParser() *SpintaxParser {
	return defaultSpintaxParser
}
